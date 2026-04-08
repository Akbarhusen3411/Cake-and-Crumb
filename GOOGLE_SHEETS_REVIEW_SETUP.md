# Google Sheets Review System Setup

Customer reviews with photos, linked to specific products. Reviews show on product cards in the menu.

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it "Cake & Crumb Reviews"
3. In **Row 1**, add these headers exactly:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| product | name | rating | text | date | photo |

Type `product` in A1, press Tab, `name`, Tab, `rating`, Tab, `text`, Tab, `date`, Tab, `photo`

## Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  var reviews = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] && data[i][2] && data[i][3]) {
      reviews.push({
        product: data[i][0],
        name: data[i][1],
        rating: data[i][2],
        text: data[i][3],
        date: data[i][4],
        photo: data[i][5] || ''
      });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(reviews))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = JSON.parse(e.postData.contents);

  var photoUrl = '';
  if (data.photo) {
    try {
      var blob = Utilities.newBlob(Utilities.base64Decode(data.photo), 'image/jpeg', 'review_' + Date.now() + '.jpg');
      var folder = getDriveFolder();
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
      photoUrl = 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w800';
    } catch (err) {
      photoUrl = '';
    }
  }

  sheet.appendRow([
    data.product || '',
    data.name,
    data.rating,
    data.text,
    data.date || new Date().toISOString(),
    photoUrl
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getDriveFolder() {
  var folderName = 'Cake & Crumb Reviews Photos';
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}
```

3. Click **Save** (Ctrl+S)

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon > **Web app**
3. Set: Execute as **Me**, Who has access **Anyone**
4. Click **Deploy** > **Authorize access** > follow prompts
5. Copy the Web app URL

**If redirect loop:** Use incognito window with one Google account.

**IMPORTANT:** If you already had a previous deployment, you must create a **New deployment** (not "Manage deployments") to get the updated code.

## Step 4: Add URL to Website

Open `src/config/googleSheetReviews.js` and paste your URL:

```javascript
export const REVIEWS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec'
```

## Done!

- **Review link:** `https://akbarhusen3411.github.io/Cake-and-Crumb/#/review`
- Customer selects the product they ordered, gives star rating, writes review, optionally adds photo
- Reviews appear on product cards in the menu (star badge + review section below products)
- Reviews also appear on the Reviews page
- Moderate by editing/deleting rows in the Google Sheet
- Photos saved in Google Drive folder "Cake & Crumb Reviews Photos"

## Google Sheet Columns

| Column | Description |
|--------|-------------|
| product | Product name (e.g., "Pistachio", "Brownie") — matches to product cards |
| name | Customer name |
| rating | 1-5 star rating |
| text | Review text |
| date | Auto-generated ISO date |
| photo | Google Drive photo URL (auto-filled) |
