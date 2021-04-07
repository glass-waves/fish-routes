DROP TABLE IF EXISTS fishes;


CREATE TABLE fishes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fish_name TEXT NOT NULL, 
    size TEXT NOT NULL,
    freshwater BOOLEAN NOT NULL,
    region TEXT NOT NULL
)