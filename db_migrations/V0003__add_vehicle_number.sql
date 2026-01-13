ALTER TABLE t_p82812282_daily_report_app.reports
ADD COLUMN vehicle_number VARCHAR(50);

COMMENT ON COLUMN t_p82812282_daily_report_app.reports.vehicle_number IS 'Номер транспортного средства';