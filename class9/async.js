async function getUserData(userId) {
  try {
    // Step 1: Fetch user
    let userRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
 
    if (!userRes.ok) {
      throw new Error("User not found: " + userRes.status);
    }
 
    let user = await userRes.json();
    console.log("User:", user.name);
 
    // Step 2: Fetch their posts
    let postsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    let posts = await postsRes.json();
    console.log("Posts count:", posts.length);
 
    return { user, posts };
 
  } catch (error) {
    console.error("Failed:", error.message);
    throw error; // re-throw for caller to handle
  } finally {
    console.log("Request finished");
  }
}
 
getUserData(1);