import axios from "axios";
async function githubRepoInfo(username) {
  if (!username) return;
  const githubUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const res = await axios(githubUrl);
  if (!res.data) return;
  return res.data;
};
async function githubUserInfo(username) {
  if (!username) return;
  const githubUrl = `https://api.github.com/users/${username}`;
  const res = await axios(githubUrl);
  if (!res.data) return;
  return res.data;
};

export {githubRepoInfo, githubUserInfo};
