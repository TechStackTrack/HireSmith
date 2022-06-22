-- DROP TABLE interview_questions CASCADE

CREATE TABLE "questions" (
  "_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" VARCHAR UNIQUE,
  "difficulty" VARCHAR,
  "type" VARCHAR,
  "prompt" VARCHAR, 
  "comment" VARCHAR
)

CREATE TABLE "companies" (
  "_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "company" VARCHAR UNIQUE
)

CREATE TABLE "rounds" (
  "_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "round" VARCHAR UNIQUE
)

CREATE TABLE "join_table" (
   "_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "question_id" INT REFERENCES "questions" ("_id"),
   "company_id" INT REFERENCES "companies" ("_id"),
   "round_id" INT REFERENCES "rounds" ("_id")
)

-- CREATE TABLE  public.species_in_films (
-- 	"_id" serial NOT NULL,
-- 	"film_id" bigint NOT NULL,
-- 	"species_id" bigint NOT NULL,
-- 	CONSTRAINT "species_in_films_pk" PRIMARY KEY ("_id")
-- ) WITH (
--   OIDS=FALSE
-- );



-- Run this command in terminal from db directory to execute this file
-- psql -d postgres://ecouqssf:Db_QrtLbmSklXI6FzhLMED4XC6eqJe5U@heffalump.db.elephantsql.com/ecouqssf -f db.sql





