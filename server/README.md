# Server

## Running the project

- Make sure you have `google-application-credentials.json` file.
- Make sure you have `.env`
- Run `swag init -g api/controller/0_index.go` to update swagger
- Run `go run . app:serve`

## Environment Variables

<details>
    <summary>Variables Defined in the project </summary>

| Key                              | Value                    | Desc                                        |
| -------------------------------- | ------------------------ | ------------------------------------------- |
| `SERVER_PORT`                    | `8000`                   | Port at which app runs                      |
| `ENV`                            | `development,production` | App running Environment                     |
| `LOG_OUTPUT`                     | `./server.log`           | Output Directory to save logs               |
| `LOG_LEVEL`                      | `info`                   | Level for logging (check lib/logger.go:172) |
| `GOOGLE_APPLICATION_CREDENTIALS` | `path`                   | Firebase Account service                    |
| `PROJECT_ID`                     | `island-gulu`            | Firebase Project ID                         |
| `BACKEND_URL`                    | `localhost:800`          | Endpoint for swagger                        |
| `SHEMES`                         | `http` / `https`         | https or http                               |

</details>

## Implemented Features

- Dependency Injection (go-fx)
- Routing (gin web framework)
- Environment Files
- Logging (file saving on `production`) [zap](https://github.com/uber-go/zap)
- Middlewares (cors)
- Firebase Service with Firbase SDK Admin
- Repositories
- Authentication (JWT with firebase custom token)
- Cobra Commander CLI Support. try: `go run . --help`

## Todos

- [x] COBRA Commander CLI Support
- [x] Swagger documentation examples -- http://localhost:8000/swagger/index.html
- [ ] Implementing Basic CRUD Operation
- [ ] Unit testing examples
- [ ] Use of Interfaces
