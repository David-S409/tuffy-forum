# Tuffy Forum Backend

## Available Endpoints

Below is a list of available endpoints in the API:

# Question API

## Endpoint 1

### `GET /questions`

Description: Get current user's list of question **(Must be logged in)**.

#### Response Example

```json
[
  {
    "questionId": 1,
    "authorId": 1,
    "courseId": 1,
    "header": "Question Header",
    "text": "This is the question",
    "postDate": "2023-03-27T15:41:00.832Z",
    "answers": []
  },
  {
    "questionId": 2,
    "authorId": 2,
    "courseId": 1,
    "header": "Question Header",
    "text": "This is the question",
    "postDate": "2023-03-27T15:41:00.832Z",
    "answers": []
  }
]
```

## Endpoint 2

### `GET /questions/:id`

Description: Get question given an id

```csharp
#### Request Parameters

| Parameter | Type       | Required |           Description              |
| --------- | ---------- | -------- | ---------------------------------- |
| id        | string/int | yes      | ID of the question trying to reach |


```

#### Response Example

```json
{
  "questionId": 1,
  "authorId": 1,
  "courseId": 1,
  "header": "Question Header",
  "text": "This is the question",
  "postDate": "2023-03-27T15:41:00.832Z",
  "answers": []
}
```

## Endpoint 3

### `GET /questions/search`

Description: Search questions using search terms

```csharp
#### Request Parameters

| Parameter | Type   | Required |           Description                          |
| --------- | ------ | -------- | ---------------------------------------------- |
| header    | string | no       | Checks headers of all question for search term |
| text      | string | no       | Checks text of all question for search term    |



```

#### Response Example

```json
{
  "questionId": 1,
  "authorId": 1,
  "courseId": 1,
  "header": "Question Header",
  "text": "This is the question",
  "postDate": "2023-03-27T15:41:00.832Z",
  "answers": []
}
```

## Endpoint 4

### `POST /question`

Description: Post a Question **(Must be logged in)**.

```csharp
#### Query Parameters

| Parameter | Type       | Required |  Description                              |
| --------- | ---------- | -------- | ----------------------------------------- |
| courseId  | string/int | yes      | ID of the course associated with question |
| header    |   string   | yes      | Header for the question                   |
| text      |   string   | yes      | Body of the question                      |
```

#### Response Example

```json
{
  "questionId": 3,
  "authorId": 1,
  "courseId": 1,
  "header": "Question Header",
  "text": "this is my text",
  "postDate": "2023-03-27T22:48:25.624Z"
}
```

## Endpoint 5

### `POST /(upvote | downvote)/question/:id`

Description: Upvotes or downvotes a question given an id **(Must be logged in)**.

#### Response Example

```json
{
  "votes": 2
}
```

# Course API

## Endpoint 1

### `GET /courses`

Description: Get all courses

#### Response Example

```json
[
  {
    "courseId": 1,
    "courseCode": "CPSC 872",
    "name": "Best Course"
  },
  {
    "courseId": 2,
    "courseCode": "CPSC 231",
    "name": "Title"
  },
  {
    "courseId": 8,
    "courseCode": "CPSC 362",
    "name": "Software"
  }
]
```
