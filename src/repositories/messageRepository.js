const pool = require("../db/pool");

async function findMessagesByConversationId(
  conversationId
) {
  const query = `
    SELECT
      m.id,
      m.conversation_id,
      m.sender_id,
      u.name AS sender_name,
      m.content,
      m.created_at
    FROM messages m
    JOIN users u
      ON u.id = m.sender_id
    WHERE m.conversation_id = $1
    ORDER BY m.created_at ASC
    LIMIT 100
  `;

  const result = await pool.query(query, [
    conversationId,
  ]);

  return result.rows;
}

async function createMessage({
  conversationId,
  senderId,
  content,
}) {
  const query = `
    INSERT INTO messages (
      conversation_id,
      sender_id,
      content
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      conversation_id,
      sender_id,
      content,
      created_at
  `;

  const result = await pool.query(query, [
    conversationId,
    senderId,
    content,
  ]);

  return result.rows[0];
}

module.exports = {
  findMessagesByConversationId,
  createMessage,
};