import githubModal from "../model/github.model.js";
import userModel from "../model/user.model.js";

async function saveGithubDataInDB({ userReadme, githubUser, githubRepos },userId) {
  
  // store working topics
  const topics = new Set([]);
  githubRepos?.forEach((repo) => {
    repo.topics.forEach((topic) => {
      topics.add(topic);
    });
  });
  // top repos
  const topRepos = githubRepos
    ?.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stars: repo.stargazers_count,
      size: repo.size,
      topics: repo.topics,
      languages: repo.languages,
      defaultBranch: repo.default_branch,
      recentActivity: repo.pushed_at,
      score: (
        repo.stargazers_count * 2 +
        repo.forks_count * 1.5 +
        repo.size * 0.01
      ).toFixed(2),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  // languages co
  const languageCount = {};
  githubRepos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(languageCount).map(([lang, count]) => ({
    name: lang,
    repos: count,
  }));

  // save in db
   let github = await githubModal.findOne({ userId });
   if(!github){
    github = await githubModal.create({
      userId,
          name: githubUser.name,
      username: githubUser.login,
      bio: githubUser.bio,
      location: githubUser.location,
      blog: githubUser.blog,
      publicRepoCount: githubUser.public_repos,
      readme: userReadme,
      languages: topLanguages,
      userWorkTopics: Array.from(topics),
      topRepos,
    });
  }
  await githubModal.findByIdAndUpdate(
    github._id,
    {
      name: githubUser.name,
      username: githubUser.login,
      bio: githubUser.bio,
      location: githubUser.location,
      blog: githubUser.blog,
      publicRepoCount: githubUser.public_repos,
      readme: userReadme,
      languages: topLanguages,
      userWorkTopics: Array.from(topics),
      topRepos,
    },
    { new: true }
  );
}

export { saveGithubDataInDB };
