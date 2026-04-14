import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',   // where HTML files go
      assets: 'build',  // where static assets go
      fallback: null    // set to 'index.html' if you're doing a SPA
    })
  }
};

export default config;
