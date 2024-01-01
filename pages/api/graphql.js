import axios from 'axios';
import { parse } from 'graphql';
//import verifyToken from '@/lib/jwt_verify';

export default async function handler(req, res) {

if (!req.headers.token) {
        res.status(401).json({ error: "No JWT provided, access denied" });
        return;
    }
else {
        const decodedData = verifyToken(req.headers.token);
        //console.log(decodedData);
        if (decodedData) {
            try {
                // Parse the GraphQL query
                const query = req.body.query ? parse(req.body.query) : null;
                const variables = req.body.variables;
                const operation = query.definitions[0];//[0].operation;
    
                if (!isUserAuthorizedForOperation(decodedData, operation, variables)) {
                    res.status(403).json({ error: "Not authorized for this operation" });
                    return;
                }
    
                // Forward the request to the GraphQL endpoint
                const response = await axios.post(GraphQL_endpoint, req.body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': GraphQL_API_KEY,
                    },
                });
    
                res.status(200).json(response.data);
            } catch (error) {
                console.error('API route error:', error);
                res.status(error.response?.status || 500).json({ message: error.message });
            }
        } else {
            res.status(401).json({ error: "Invalid JWT" });
        }
    }
}

function isUserAuthorizedForOperation(userData, operation, variables) {
    
    /*
    if(operation.name.value === "CreateUser" || operation.name.value === "updateSubscribedCourse" || operation.name.value === "createSubscribedCourse" || operation.name.value === "deleteUser" || operation.name.value === "createTimeSpent")
    return false;
    */
    if(userData.userId==="1") return true;
    else if(userData.userId !== "1" && (operation.name.value === "getUser" || operation.name.value === "updateUser" || operation.name.value === "getActiveLab" || operation.name.value === "getChallenge" || operation.name.value === "getCohort" || operation.name.value === "getInstructor" || operation.name.value === "getQuiz" || operation.name.value === "getSubscribedCourse" || operation.name.value === "getTimeSpent" || operation.name.value === "listActiveLabs" || operation.name.value === "listChallenges" || operation.name.value === "listCohorts" || operation.name.value === "listInstructors" || operation.name.value === "listQuizzes" || operation.name.value === "listSubscribedCourses" || operation.name.value === "listTimeSpents" || operation.name.value === 'ListUsers')){
    if (operation.name.value === 'ListUsers') {
        // Get the variables from the request body

        if (variables && variables.filter && variables.filter.nbspID) {
            const nbspIDFilter = variables.filter.nbspID;
            // Assuming we are interested in the 'eq' filter
            const nbspID = nbspIDFilter.eq;
            if (nbspID && userData.userId !== nbspID) {
                return false; // Block operation if IDs don't match
            }
            else return true;
        }
        else return true;
    }
    else if (operation.name.value === 'getUser') {
        // Get the variables from the request body
        if (variables && variables.input && variables.input.nbspID) {
            const nbspID = variables.input.nbspID;
            if (nbspID && userData.userId !== nbspID) {
                return false; // Block operation if IDs don't match
            }
            else return true;
        }
        else return true;
    }
    }
    else return false;
}