const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = req.user.role === 'admin' ? {} : { assignedTo: userId };

    const stats = await Task.aggregate([
      { $match: filter },
      {
        $facet: {
          statusCounts: [
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ],
          priorityCounts: [
            { $group: { _id: "$priority", count: { $sum: 1 } } }
          ],
          tasksByDay: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id": 1 } },
            { $limit: 7 }
          ]
        }
      }
    ]);

    // Handle empty results
    const result = stats[0] || { statusCounts: [], priorityCounts: [], tasksByDay: [] };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
