CREATE TABLE "interview_questions" (
  "_id" SERIAL PRIMARY KEY,
  "questions" VARCHAR,
  "type" VARCHAR,
  "level" VARCHAR,
  "content" VARCHAR
)

CREATE TABLE "user_table" (
  "_id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "password" VARCHAR,
  "email" VARCHAR
  
)

CREATE TABLE "question_info" (
  "_id" SERIAL PRIMARY KEY, 
  "company_name" VARCHAR,
  "round" VARCHAR,
  "comments" VARCHAR,
  "follow_up" BOOLEAN
)

-- call this join_table?
CREATE TABLE "join_table" (
  "_id" SERIAL PRIMARY KEY,
  "question_id" integer REFERENCES "interview_questions" ("_id"),
  "question_info_id" integer REFERENCES "question_info" ("_id")
)



