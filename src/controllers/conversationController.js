const conversationService = require(
  "../services/conversationService"
);

async function createDirectConversation(
  req,
  res,
  next
) {
  try {
    const currentUserId = req.user.userId;
    const { userId } = req.params;

    const conversation =
      await conversationService.getOrCreateDirectConversation(
        currentUserId,
        userId
      );

    res.status(200).json({
      conversation,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createDirectConversation,
};