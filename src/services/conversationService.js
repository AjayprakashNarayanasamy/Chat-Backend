const pool = require("../db/pool");
const userRepository = require("../repositories/userRepository");
const conversationRepository = require("../repositories/conversationRepository");

async function getOrCreateDirectConversation(
  currentUserId,
  otherUserId
) {
  if (String(currentUserId) === String(otherUserId)) {
    const error = new Error(
      "You cannot start a conversation with yourself"
    );

    error.statusCode = 400;

    throw error;
  }

  const otherUser =
    await userRepository.findUserById(otherUserId);

  if (!otherUser) {
    const error = new Error("User not found");

    error.statusCode = 404;

    throw error;
  }

  const existingConversation =
    await conversationRepository.findDirectConversation(
      currentUserId,
      otherUserId
    );

  if (existingConversation) {
    return existingConversation;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const conversation =
      await conversationRepository.createConversation(
        client
      );

    await conversationRepository.addConversationMember(
      client,
      conversation.id,
      currentUserId
    );

    await conversationRepository.addConversationMember(
      client,
      conversation.id,
      otherUserId
    );

    await client.query("COMMIT");

    return conversation;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

async function verifyConversationAccess(
  conversationId,
  userId
) {
  const isMember =
    await conversationRepository.isUserMember(
      conversationId,
      userId
    );

  if (!isMember) {
    const error = new Error(
      "You do not have access to this conversation"
    );

    error.statusCode = 403;

    throw error;
  }
}

module.exports = {
  getOrCreateDirectConversation,
  verifyConversationAccess,
};