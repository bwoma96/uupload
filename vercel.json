{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    {
      "src": "/files",
      "dest": "/files"
    },
    {
      "src": "/delete",
      "dest": "/delete"
    },
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
