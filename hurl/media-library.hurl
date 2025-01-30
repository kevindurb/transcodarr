GET http://{{host}}/media_libraries
HTTP 200

POST http://{{host}}/media_libraries
{
  "path": "/media/Movies"
}
HTTP 201
