CREATE TABLE IF NOT EXISTS t_p82812282_daily_report_app.reports (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL DEFAULT 'default_user',
    date DATE NOT NULL,
    title VARCHAR(500) NOT NULL,
    tasks TEXT NOT NULL,
    achievements TEXT,
    plans TEXT,
    hours INTEGER NOT NULL DEFAULT 8,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_user_date ON t_p82812282_daily_report_app.reports(user_id, date DESC);
CREATE INDEX idx_reports_created_at ON t_p82812282_daily_report_app.reports(created_at DESC);