import json
import os
import psycopg2
from datetime import datetime
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для управления ежедневными отчётами: создание, получение списка, статистика'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        user_id = event.get('headers', {}).get('X-User-Id', 'default_user')
        
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            action = query_params.get('action', 'list')
            
            if action == 'stats':
                cursor.execute('''
                    SELECT 
                        COUNT(*) as total_reports,
                        COALESCE(AVG(hours), 0) as avg_hours,
                        COALESCE(SUM(hours), 0) as total_hours
                    FROM t_p82812282_daily_report_app.reports
                    WHERE user_id = %s
                ''', (user_id,))
                stats = dict(cursor.fetchone())
                
                cursor.execute('''
                    SELECT COUNT(*) as week_reports
                    FROM t_p82812282_daily_report_app.reports
                    WHERE user_id = %s 
                    AND date >= CURRENT_DATE - INTERVAL '7 days'
                ''', (user_id,))
                week_data = dict(cursor.fetchone())
                stats.update(week_data)
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(stats, default=str),
                    'isBase64Encoded': False
                }
            
            else:
                limit = int(query_params.get('limit', 50))
                offset = int(query_params.get('offset', 0))
                
                cursor.execute('''
                    SELECT id, user_id, date, title, tasks, achievements, plans, hours, created_at
                    FROM t_p82812282_daily_report_app.reports
                    WHERE user_id = %s
                    ORDER BY date DESC, created_at DESC
                    LIMIT %s OFFSET %s
                ''', (user_id, limit, offset))
                
                reports = [dict(row) for row in cursor.fetchall()]
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'reports': reports}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            title = body.get('title', '').strip()
            tasks = body.get('tasks', '').strip()
            achievements = body.get('achievements', '').strip()
            plans = body.get('plans', '').strip()
            hours = int(body.get('hours', 8))
            date = body.get('date', datetime.now().strftime('%Y-%m-%d'))
            
            if not title or not tasks:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Title and tasks are required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('''
                INSERT INTO t_p82812282_daily_report_app.reports 
                (user_id, date, title, tasks, achievements, plans, hours)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, user_id, date, title, tasks, achievements, plans, hours, created_at
            ''', (user_id, date, title, tasks, achievements, plans, hours))
            
            new_report = dict(cursor.fetchone())
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'report': new_report}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            report_id = query_params.get('id')
            
            if not report_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Report ID is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('''
                DELETE FROM t_p82812282_daily_report_app.reports
                WHERE id = %s AND user_id = %s
                RETURNING id
            ''', (report_id, user_id))
            
            deleted = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            
            if deleted:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Report deleted'}),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Report not found'}),
                    'isBase64Encoded': False
                }
        
        else:
            cursor.close()
            conn.close()
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
