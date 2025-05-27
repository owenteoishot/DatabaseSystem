const profileModel = require('../models/profileModel');

exports.getProfile = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const profile = await profileModel.getProfileByUserId(userId);
    res.json(profile || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.user_id;
  const { displayName, avatarUrl, bio, socialLinks } = req.body;
  try {
    const updated = await profileModel.createProfile(
      userId,
      displayName,
      avatarUrl,
      bio,
      socialLinks
    );
    res.json({ message: 'Profile updated', profile: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
