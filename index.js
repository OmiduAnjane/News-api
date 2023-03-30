const express = require('express');

const https = require('https');

const app = express();

app.get('/news/:id', (req, res) => {

  const articleId = req.params.id;

  https.get(`https://www.hirunews.lk/${articleId}/${article}`, (response) => {

    let html = '';

    response.on('data', (chunk) => {

      html += chunk;

    });

    response.on('end', () => {

      res.send(html);

    });

  }).on('error', (err) => {

    console.error(err);

    res.status(500).send('Error fetching news article.');

  });

});

app.listen(8000, () => {

  console.log('Server is running on port 8000.');

});

const express = require('express');

const cheerio = require('cheerio');

const https = require('https');

const app = express();

app.get('/api/news/:id', (req, res) => {

  const articleId = req.params.id;

  https.get(`https://www.hirunews.lk/${articleId}`, (response) => {

    let html = '';

    response.on('data', (chunk) => {

      html += chunk;

    });

    response.on('end', () => {

      const $ = cheerio.load(html);

      const title = $('h1.article-title').text().trim();

      const date = $('span.article-date').text().trim();

      const author = $('div.article-author span').text().trim();

      const description = $('meta[name="description"]').attr('content').trim();

      const imageUrl = $('meta[property="og:image"]').attr('content').trim();

      const body = [];

      $('div.article-content p').each((i, el) => {

        body.push($(el).text().trim());

      });

      const article = {

        title,

        date,

        author,

        description,

        imageUrl,

        body,

      };

      res.json(article);

    });

  }).on('error', (err) => {

    console.error(err);

    res.status(500).send('Error fetching news article.');

  });

});

app.listen(8000, () => {

  console.log('Server is running on port 8000.');

});
