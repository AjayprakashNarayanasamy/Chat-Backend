const pool = require("../db/pool");

async function findDirectConversation(userId1, userId2) {
  const query = `
    SELECT c.id, c.created_at
    FROM conversations c
    JOIN conversation_members cm1
      ON cm1.conversation_id = c.id
    JOIN conversation_members cm2
      ON cm2.conversation_id = c.id
    WHERE cm1.user_id = $1
      AND cm2.user_id = $2
      AND (
        SELECT COUNT(*)
        FROM conversation_members cm
        WHERE cm.conversation_id = c.id
      ) = 2
    LIMIT 1
  `;

  const result = await pool.query(query, [
    userId1,
    userId2,
  ]);

  return result.rows[0] || null;
}

async function createConversation(client) {
  const query = `
    INSERT INTO conversations
    DEFAULT VALUES
    RETURNING id, created_at
  `;

  const result = await client.query(query);

  return result.rows[0];
}

async function addConversationMember(
  client,
  conversationId,
  userId
) {
  const query = `
    INSERT INTO conversation_members (
      conversation_id,
      user_id
    )
    VALUES ($1, $2)
  `;

  await client.query(query, [
    conversationId,
    userId,
  ]);
}

async function isUserMember(
  conversationId,
  userId
) {
  const query = `
    SELECT 1
    FROM conversation_members
    WHERE conversation_id = $1
      AND user_id = $2
  `;

  const result = await pool.query(query, [
    conversationId,
    userId,
  ]);

  return result.rowCount > 0;
}

module.exports = {
  findDirectConversation,
  createConversation,
  addConversationMember,
  isUserMember,
};