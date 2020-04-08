# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Software Engineneering Immersive: Project 4 (Individual)

This is my final project I built during the General Assembly Software Engineering Immersive course (Week 12).
CHANGE

**<h1>Story Maker</h1>**

A full stack React and Python collaborative story-telling app for pre-teens.

![home page](https://i.imgur.com/hGMWOUE.png)


**<h1>Built With</h1>**
* HTML5
* CSS
* Javascript
    * ECMAScript6
    * React.js
    * axios
    * Node.js
* Python
    * Django 
* mySQL
    * PostgreSQL   
* Testing
    * Manual: Insomnia
* GitHub

**<h1> Deployment </h1>**
The comic book database app is deployed on Heroku and it can be found here: https:/storymaker.herokuapp.com/

**<h1>User experience</h1>**

When the user lands on the website they can head to the About page, which gives them information about the site as well having a 'Story Button'. This generates a random story for the user every time they click on it.

![about page](https://i.imgur.com/Mz4kAXG.png)

The user can login using the login form. But if they don't have an account they can click on the 'register here' link which redirects them to the register page.

![login page](https://i.imgur.com/jd7Ywc9.png)

![register page](https://i.imgur.com/K9gLD8d.png)

After login in the user will be taken to the story index page, where they can see all the stories other users have made. They can than decide whether they want to look at them, or age ranges the storys are suitable for. 

![individual story](https://i.imgur.com/JkhFOOb.png)

The user can then click on a story and add a line to it (provided they are logged in and where not the original story poster, or made the last line). 

![story index](https://i.imgur.com/sgsu9Dv.png)

Once they have added a line to the story, it appears on the page.

![add a line](https://media.giphy.com/media/lqeNti0rMGnj4Afu4X/giphy.gif)

They are then re-directed back to the story index page.

Another user can then add the next line of the story!

The user can also make a story.

![new story form](https://i.imgur.com/nu72b5H.png)

If they need inspiration they can use the writing prompt button, which will offer them a random first line.

![writing prompt](https://i.imgur.com/80BBQIu.png)

They then fill in the rest of the story form, upload an image and put in an age rating and genre. 

![filled in story form](https://i.imgur.com/IUCjdCR.png)

They submit the story and are taken to the story page. It displays there finished story and they are then instructed to wait for another user to contribute.

![created story](https://i.imgur.com/CSmCxxc.png)

The user has a profile, which they can view, edit or delete. If they have not created a story, they are encouraged to. 

![profile](https://i.imgur.com/nrQQ8er.png)

And if they have made the story it will be listed under the 'Created Story's section.'

![profile with made story](https://i.imgur.com/Ec6hgbO.png)

The user can also find a story by genre using the drop down genre menu on the nav bar. These are the storys listed under 'spooky.'

![story genres](https://i.imgur.com/bokIOVq.png)

**<h1>Planning</h1>**

I used google sheets to log what pages I wanted in the front end, and what I wanted my back end models to look like.

![front end](https://i.imgur.com/qFUvvc6.png)

![back end](https://i.imgur.com/fYif46d.png)


**<h1>Challenges</h1>**

For the app to work the lines had to be written alternately, so I had to prevent the user being able to add the next line directly after they had contributed one. 

I decided to use the Django backend to stop this happening. The code below shows the functionality behind the view request, which stops the user adding a line if they have already made one.

It was extremely tricky to build, as it had to serialize the information, check to see if there were any lines in the data request to start with and then check if the 'story owner' was the same as the 'line owner'.

```javascript
class LineListView(APIView):
  #this router checks if the person adding the line to the story is different then the person who added a line before them
  #if they are different then they are allowed to make the request

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request, pk):
        # request data user is the same as that owner
        request.data['owner'] = request.user.id
        # get the story the line is being added to    
        request.data['story'] = pk
        #serializing the data we have requested so we can make our checks on it (previous line and story)
        line = LineSerializer(data=request.data)
        story = Story.objects.get(pk=pk)
        serialized_story = PopulatedStorySerializer(story)
        request.data['owner'] = request.user.id
        #getting the index of the last line
        index_last_story = len(serialized_story.data.get("lines")) - 1
        #getting the index of the lines
        lines_list_length = len(serialized_story.data.get("lines"))
        #checking to see if the story has lines in it, and then getting the owner of the last line.
        if lines_list_length:
            last_story = serialized_story.data.get("lines")[index_last_story]
            last_owner = last_story.get("owner")
        if lines_list_length > 0:
          #if there are lines on the story, and if the owner is the same as the current user, then stop them adding a line
          if last_owner.get("id") == request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
          #if its valid, saving the story 
        if line.is_valid():
          line.save()
          story = Story.objects.get(pk=pk)
          serialized_story = PopulatedStorySerializer(story)
          return Response(serialized_story.data)
        return Response(line.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)    
```
In the front end the user initally was allowed to add a line without login in, and the owner of the story was also allowed to add the first line. So I had to add extra functionality to prevent this happening.

```javascript
 //Function to see if the person is allowed to add a line to the story or not
  //check if the person who wrote the story is different to the person who is logged in
  canEdit = () => {
    const checkLines = this.state.story.lines
    try {
      //check the auth token, if it's not the same as the owner of the last line then they are allowed to edit
      return Auth.getPayLoad().sub !== checkLines[checkLines.length-1].owner.id
    } catch(err) {
      return true
    }

  }

  //checks if the person who wrote the story is the same as the person who is logged in
  isOwner = () => {
    console.log(this.state.story.owner.id)
    console.log(Auth.getPayLoad().sub )
    return Auth.getPayLoad().sub === this.state.story.owner.id
  }
```

**<h1>Wins and Key Learning</h1>**

Having learnt Python and Django the week before I was pleased with what I achieved. I am proud of the added functions, such as the random story generator as well as being able to use the backend to stop users adding in lines when they are not allowed. That was a difficult process, which taught me a lot about getting information from the backend using Django and manipulating it. I had some models I had to discard due to time constraints, so my key learning was having simple ideas for functionality - planning for less, and then adding in 'nice to have' features if time allows. 

**<h1>Future Improvements</h1>**

In the future, I want to build automated tests as I've only tested the app manually through Insomia and the browser.

The age form for making a new story will be a drop down form, rather then having a 'max' and 'min' validator in the model (which currently prevents the user from putting in any age outside of 6-12, and alerts them if they invalid the model).

I would also like to add in a 'joke' making section, which follows the principles of the story making model and allows users to add punchlines to each other jokes. 