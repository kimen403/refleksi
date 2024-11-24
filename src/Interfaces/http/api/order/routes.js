const routes = (handler) => [
  {
    method: "GET",
    path: "/order",
    handler: handler.getOrdersHandler,
  },
  // {
  //     method: 'DELETE',
  //     path: '/threads/{threadId}/comments/{commentId}',
  //     handler: handler.deleteCommentHandler,
  //     options: {
  //         auth: 'forumapi_jwt',
  //     },
  // },
];

module.exports = routes;
