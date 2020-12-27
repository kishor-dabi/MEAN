# MEAN

Steps to run applocation :: 

1. run "<b>npm install</b>" to install packages on both back-end and UI.
2. run "<b>npm start</b>" on both directory path to start the Server



3. for Create Admin User 
hit below URL with data on postman :
<pre>
url : http://127.0.0.1:8080/api/user/

method : post

{
        "email": "admin@admin.com",
        "password":"12345",
        "user_type":1
}
</pre>
or create manual entry in database in users table with data:
<pre>
{
    "email": "admin@admin.com",
    "password": "$2b$10$aK/dFmYM5XnHOt9SVFgdVuF7KvM6b4/z/2Ah/cjxyPf0wjuLy/yWK",
    "user_type": 1,
    "date_of_birth": "2000-12-27T14:15:41.295Z",
    "createdAt": "2020-12-27T14:15:41.376Z",
    "updatedAt": "2020-12-27T14:15:41.376Z",
    "id": "5fe8970dfd63234408a68a96"
}
</pre>
