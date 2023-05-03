# Tuffy Forum Backend

## Available Endpoints

Below is a list of available endpoints in the API:

# User API

## Endpoint 1

### `GET /user/onboard`

Description: Updates user to ONBOARDED **(Must be logged in)**.

#### Response Example

```json
{
  "success": "updated"
}
```

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
| search    | string | yes       | Checks everything of all question for search term |



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

## Endpoint 6

### `GET /question/remove/:id`

Description: Remove Question **(Must be logged in)**.

#### Response Example

```json
{
  "msg": "Question Deleted"
}
```

# Course API

## Endpoint 1

### `GET /courses`

Description: Get all courses **(Must be logged in)**.

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

## Endpoint 2

### `POST /add/course/:id`

Description: Add course to user **(Must be logged in)**.

```csharp
#### Request Parameters

| Parameter | Type       | Required |           Description              |
| --------- | ---------- | -------- | ---------------------------------- |
| id        | string/int | yes      | ID of the course being added       |


```

#### Response Example

```json
{
  "courses": [
    {
      "courseId": 1,
      "courseCode": "CPSC 872",
      "name": "Best Course"
    },
    {
      "courseId": 8,
      "courseCode": "CPSC 362",
      "name": "Software"
    }
  ]
}
```

## Endpoint 3

### `GET /course/remove/:id`

Description: Add course to user **(Must be logged in)**.

```csharp
#### Request Parameters

| Parameter | Type       | Required |           Description              |
| --------- | ---------- | -------- | ---------------------------------- |
| id        | string/int | yes      | ID of the course being removed     |


```

#### Response Example

```json
[
  {
    "courseId": 1,
    "courseCode": "CPSC 872",
    "name": "Best Course"
  }
]
```

## Endpoint 3

### `POST /course`

Description: Create and Add course to user **(Must be logged in)**.

#### Response Example

```json
{
  "courses": [
    {
      "courseId": 1,
      "courseCode": "CPSC 872",
      "name": "Best Course"
    },
    {
      "courseId": 12,
      "courseCode": "CPSC 212",
      "name": "name"
    },
    {
      "courseId": 13,
      "courseCode": "CPSC 214",
      "name": "name2"
    },
    {
      "courseId": 14,
      "courseCode": "CPSC 215",
      "name": "name2"
    }
  ]
}
```
