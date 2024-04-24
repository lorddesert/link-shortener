# Link shortener..

I think the idea being building something that you can actually use, like in your daily basis. Try building it for you and then deliver it as may like?



- [x] Add pending state when submitting.
- [?] Add a click/used count field on link DB model. Last used?
- [x] Elaborate design? xD.
- [x] Auth for matching links with users.
- [x] Connect Supabase.
- [x] Store data in supabase.
- [?] Retrieve 10 last links and display them in the home page.
- [?] Make a server route to get the 10 last link creations.
- [?] Change Title and favicon of the app.
## Possible changes
- [?] Add the option to let the user create his own short keys.
  * User would enter the short key, check on DB if short key EXISTS ONLY IN HIS ACCOUNT.
    1. Create a new link with user-provided short key.
    2. ERROR: Trying to create a short key with an already existing short key.
- [?] Add last time used.
- [?] If I want to make it personal use only or not, I can provide a special auth code or key that goes into the form that is used on the app when creating a new link.


### Comments or possible changes /0_0/

* Change structure for links:
```JSON
{
  "links": [
    {
      "id": "123123",
      "userID": "asdasd",
      "clickCount": 3,
      "lastTimeUsed": "20-12-2000",
      "url": {
        "original": "String",
        "short": "String" // Would always be 6 characters long?
      }
    }
  ]
}


// Or...
{
  "url": {
    "original": "String",
    "short": "String"
  }
}
```



