SELECT name FROM brand;
SELECT name, address, latitude, longitude FROM outlet;
SELECT COUNT(name) FROM product;
SELECT outlet.name AS OUTLET , 111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(outlet.latitude)) * COS(RADIANS(-6.174259983165525)) * COS(RADIANS(outlet.longitude - (106.82726363711492))) + SIN(RADIANS(outlet.latitude)) * SIN(RADIANS(-6.174259983165525))))) AS DISTANCE FROM outlet ORDER BY `DISTANCE` ASC
