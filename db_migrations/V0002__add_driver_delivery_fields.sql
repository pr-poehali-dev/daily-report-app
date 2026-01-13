ALTER TABLE t_p82812282_daily_report_app.reports
ADD COLUMN driver_name VARCHAR(255),
ADD COLUMN loading_place VARCHAR(500),
ADD COLUMN unloading_place VARCHAR(500),
ADD COLUMN material_name VARCHAR(500),
ADD COLUMN weight DECIMAL(10, 2),
ADD COLUMN trips_count INTEGER,
ADD COLUMN mileage DECIMAL(10, 2);

COMMENT ON COLUMN t_p82812282_daily_report_app.reports.driver_name IS 'ФИО водителя';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.loading_place IS 'Место погрузки';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.unloading_place IS 'Место выгрузки';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.material_name IS 'Наименование материала';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.weight IS 'Вес в тоннах';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.trips_count IS 'Количество рейсов';
COMMENT ON COLUMN t_p82812282_daily_report_app.reports.mileage IS 'Километраж';