const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const os = require('os')
const { v4: uuidv4 } = require('uuid');
const puppeteer = require("puppeteer");
const appRoot = require('app-root-path');

const app = express()
const homedir = os.homedir();
const appdir = `${homedir}/.resume-generator`
const resumesdir = `${appdir}/resumes`

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.get('/resume', (req, res) => {
  const resumes = []
  fs.readdirSync(resumesdir).forEach(filename => {
    const json = JSON.parse(fs.readFileSync(`${resumesdir}/${filename}`, {
      encoding: 'utf8'
    }))
    // console.log(json)
    resumes.push({ 'id': filename.split('.')[0], 'name': typeof json.name !== 'undefined' ? json.name : '', 'surnames': typeof json.surnames !== 'undefined' ? json.surnames : '', 'language': typeof json.language !== 'undefined' ? json.language : '' })
  });
  res.json(resumes)
})

app.get('/resume/:id', (req, res) => {
  const filename = `${req.params.id}.json`
  try {
    const json = JSON.parse(fs.readFileSync(`${resumesdir}/${filename}`, {
      encoding: 'utf8'
    }))
    // console.log(json)
    res.json(json)
  } catch(err) {
    throw err
  }
})

app.post('/resume/:id', (req, res) => {
  const filename = `${req.params.id}.json`
  try {
    fs.writeFileSync(`${resumesdir}/${filename}`, JSON.stringify(req.body.resume));
    res.json({})
  } catch(err) {
    throw err
  }
})

app.delete('/resume/:id', (req, res) => {
  const filename = `${req.params.id}.json`
  try {
    fs.unlinkSync(`${resumesdir}/${filename}`)
    res.json({})
  } catch(err) {
    throw err
  }
})

app.post('/create-file', (req, res) => {
  const filename = `${uuidv4()}.json`;

  if (!fs.existsSync(resumesdir)){
    fs.mkdirSync(resumesdir);
  }

  try {
    fs.appendFileSync(`${resumesdir}/${filename}`, '{}')
    res.json({filename: filename}); 
  } catch (err) {
    throw err
  }
})

app.get('/pdf/:id', async (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/print/${req.params.id}`

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.contentType("application/pdf");
  res.send(pdf);
})

app.get('/png/:id', async (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/print/${req.params.id}`

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const screenshot = await page.screenshot({
    omitBackground: true,
    encoding: 'binary',
    fullPage: true
  });

  await browser.close();

  res.contentType("image/png");
  res.send(screenshot);
})

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}