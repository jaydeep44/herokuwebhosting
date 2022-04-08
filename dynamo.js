const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "courses";

const getCourses = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const characters = await dynamoClient.scan(params).promise();
  console.log(characters, "character");
  return characters;
};

const getCourseById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const addOrUpdateCourse = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };
  return await dynamoClient.put(params).promise();
};

const deletecourse = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCourses,
  getCourseById,
  addOrUpdateCourse,
  deletecourse,
};
// getCourses();

// const courses = {
//   id: "2",
//   title: "Nodejs",
//   description: "This is best course",
//   cost: "350",
//   author: "jhon",
//   duration: "2 month",
// };
// addOrUpdateCharacter(courses);
