export const listChatRooms =
  /* GraphQL */
  `
    query MyQuery {
      getUser(id: "cc8323ad-3494-46eb-a723-d7877a737509") {
        id
        ChatRooms {
          items {
            _deleted
            chatRoom {
              id
              updatedAt
              name
              image
              users {
                items {
                  user {
                    id
                    image
                    name
                  }
                }
              }
              LastMessage {
                id
                createdAt
                text
              }
            }
          }
        }
      }
    }
  `;
