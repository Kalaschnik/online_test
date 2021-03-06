// the actual experiment
var simple_inf = {
  // Parameters for this sequence.
  trial: ["filler1","filler2",1,2,3,4,5],
  agents: ["Tiger"],
  agentOrient:    [
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"]],
    object: ["tree","pig","bear","robot","rocket","truck","dino"],
    inf: ["right","right","left","left","right","left","right"],
    data: [],
    targetSwitch: ["stay","switch","stay","switch","switch","stay","stay"],



    // end of the experiment
    end: function() {
      // Show the finish slide.
      showSlide("finished");

      // handle webcam file
      stopRecorder();

      // show upload spinner
      modalContent(`<img src='images/spinner-upload.svg' width='800px';>`, `#E1B4B4`)

      setTimeout(() => {
        uploadVideo(
          {
            fname: new Date().toISOString().replaceAll(':', '-').replace('.', '-') + "-" + train.subid,
            uploadContent: `<img src='images/spinner-upload.svg' width='800px';>`,
            uploadColor: `#E1B4B4`,
            successContent: `<img src='images/spinner-done.svg' width='800px';>`,
            successColor: `#D3F9D3`
          }
        );
      }, 1000);
      


      
      $(".table_l").show();
      $(".table_r").show();
      setTimeout(function() { turk.submit(simple_inf) }, 500);
    },


    // what happens between trials - display agent from previous trial and click on it to move on to the next trial
    eat: function(event) {


      showSlide("eat");

      showEat(simple_inf.agents[0])

      setTimeout(function() {simple_inf.newtrial() }, 1500);


      sourceSound("sound/end.mp3");
      playSound();

      $("#inf_ob_l").css({opacity: '1'})
      $("#inf_ob_r").css({opacity: '1'})

    },


    // unbind and shif variables between trials
    newtrial: function() {

      $(".selector_l").css("border","none")

      $(".selector_r").css("border","none")

      $(".agent_eat").unbind("click");

      $(".selector_r").unbind("click");
      $(".selector_l").unbind("click");

      leftInfObject("images/empty.png");
      rightInfObject("images/empty.png");




      simple_inf.agentOrient.shift();
      simple_inf.inf.shift();
      simple_inf.object.shift();
      simple_inf.targetSwitch.shift();
      simple_inf.trial.shift();


      simple_inf.next();
    },


    // recording the choice
    choice: function() {

      showSlide("inf_choice");

      choiceInfAgent(simple_inf.agents[0],"choice")

      $(".selector_l").show();

      $(".selector_r").show();


      sourceSound("sound/simpinf/"+simple_inf.object[0]+"_more.mp3");
      playSound();

      setTimeout(function() {
        sourceSound("sound/simpinf/"+simple_inf.object[0]+"_which.mp3");
        playSound();

      }, 3000)

      choiceLeftInfObject("images/empty.png")
      choiceRightInfObject("images/empty.png")

      if (simple_inf.targetSwitch[0] == "stay") {

        if (simple_inf.inf[0] == "left") {

          choiceLeftInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");
          choiceRightInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");

        } else {

          choiceLeftInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");
          choiceRightInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");

        };

      } else {

        if (simple_inf.inf[0] == "left") {

          choiceLeftInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");
          choiceRightInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");


        } else {

          choiceLeftInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");
          choiceRightInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");

        };

      };


      // choice can be made by clicking the objects after

      setTimeout(function() {

        $(".selector_l").click(function() {

          var clickedItem = event.target;

          var pick = event.target.id;

          clickedItem.style.border = '5px solid blue';

          $(".selector_l").unbind("click");

          $(".selector_r").hide();

          if (simple_inf.inf[0]=="left" &&   simple_inf.targetSwitch[0] == "stay") {

            var correct =1

          } else if (simple_inf.inf[0]=="right" && simple_inf.targetSwitch[0] == "switch") {

            var correct =1

          } else {

            var correct = 0
          };


          if (simple_inf.inf[0] == "left") {

            var leftObject = simple_inf.object[0]+"_ab";
            var rightObject =simple_inf.object[0]+"_a";

          } else {

            var leftObject = simple_inf.object[0]+"_a";
            var rightObject =simple_inf.object[0]+"_ab";

          };


          // data collected
          data = {
            subid: train.subid,
            subage: train.subage,
            task: "simple_inf",
            trial: simple_inf.trial[0],
            agent: simple_inf.agents[0],
            leftObject: leftObject,
            rightObject: rightObject,
            switch: simple_inf.targetSwitch[0],
            correct_location: simple_inf.inf[0],
            pick: pick,
            correct: correct
          };

          simple_inf.data.push(data);

          setTimeout(function() {
            clickedItem.style.border = '0px';
            simple_inf.eat()
          }, 1500)
        });

        $(".selector_r").click(function() {

          var clickedItem = event.target;

          var pick = event.target.id;

          clickedItem.style.border = '5px solid blue';

          $(".selector_r").unbind("click");

          $(".selector_l").hide();

          var endTime = (new Date()).getTime();

          if (simple_inf.inf[0]=="right" &&   simple_inf.targetSwitch[0] == "stay") {

            var correct =1

          } else if (simple_inf.inf[0]=="left" && simple_inf.targetSwitch[0] == "switch") {

            var correct =1

          } else {

            var correct = 0
          };



          if (simple_inf.inf[0] == "left") {

            var leftObject = simple_inf.object[0]+"_ab";
            var rightObject =simple_inf.object[0]+"_a";

          } else {

            var leftObject = simple_inf.object[0]+"_a";
            var rightObject =simple_inf.object[0]+"_ab";

          };

          // data collected
          data = {
            subid: train.subid,
            subage: train.subage,
            task: "simple_inf",
            trial: simple_inf.trial[0],
            agent: simple_inf.agents[0],
            leftObject: leftObject,
            rightObject: rightObject,
            switch: simple_inf.targetSwitch[0],
            correct_location: simple_inf.inf[0],
            pick: pick,
            correct: correct
          };

          simple_inf.data.push(data);

          setTimeout(function() {
            clickedItem.style.border = '0px';
            simple_inf.eat()
          }, 1500)
        });

      }, 1000)

    },



    // moving on within a trial
    next: function() {
      // when training is over show sinished training slide
      $(".moveButton").unbind("click");
      // when no more trials are left, end experiment
      if (simple_inf.trial.length == 0){
        setTimeout(function() {simple_inf.end() }, 0);
        return;
      };

      // after exposure is finished, switch to choice

      showSlide("inf_stage");

      showInfAgent(simple_inf.agents[0],simple_inf.agentOrient[0][0]);


      if (simple_inf.agentOrient[0][0] == "straight"){


        pause("moveButton",0);

        //  }, 3000)

      }


      if (simple_inf.trial[0] == "filler1"){

        leftInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");
        rightInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");

        if (simple_inf.agentOrient[0][0] == "straight"){

          sourceSound("sound/simpinf/tiger_inf_hello.mp3");
          playSound();

        }

      } else  if (simple_inf.trial[0] == "filler2"){

        leftInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");
        rightInfObject("images/simpinf/"+simple_inf.object[0]+"_b.png");

      } else {

        if (simple_inf.inf[0] == "left") {

          leftInfObject("images/simpinf/"+simple_inf.object[0]+"_ab.png");
          rightInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");

        } else {

          leftInfObject("images/simpinf/"+simple_inf.object[0]+"_a.png");
          rightInfObject("images/simpinf/"+simple_inf.object[0]+"_ab.png");

        };
      };



      if (simple_inf.agentOrient[0][0] == "point") {

        sourceSound("sound/simpinf/"+simple_inf.object[0]+"_label.mp3");
        playSound();

        pause("moveButton2",6000);

        if (simple_inf.inf[0] == "left"){

showInfAgent(simple_inf.agents[0],"straight")


        setTimeout(function() {
          showInfAgent(simple_inf.agents[0],"point_l")

          $("#inf_ob_l").animate({bottom: '25%', queue:  true},300)

          $("#inf_ob_l").animate({bottom: '15%', queue:  true},300)
        }, 0)



          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"look_l")
          }, 1500)

          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"point_l")

            $("#inf_ob_l").animate({bottom: '25%', queue:  false},300)

            $("#inf_ob_l").animate({bottom: '15%', queue:  true},300)

          }, 3600)

          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"look_l")
          }, 5000)

        } else {
showInfAgent(simple_inf.agents[0],"straight")
        setTimeout(function() {

          showInfAgent(simple_inf.agents[0],"point_r")

          $("#inf_ob_r").animate({bottom: '25%', queue:  false},300)

          $("#inf_ob_r").animate({bottom: '15%', queue:    true},300)

        }, 0)


          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"look_r")

          }, 1500)

          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"point_r")

            $("#inf_ob_r").animate({bottom: '25%', queue:  false},300)

            $("#inf_ob_r").animate({bottom: '15%', queue:    true},300)

          }, 3600)

          setTimeout(function() {
            showInfAgent(simple_inf.agents[0],"look_r")
          }, 5000)
        };

      } else if (simple_inf.agentOrient[0][0] == "down") {


        $("#inf_ob_l").animate({opacity: '0', queue: false},500)

        $("#inf_ob_r").animate({opacity: '0', queue: false},500)

        pause("moveButton",500);

        setTimeout(function() {
          simple_inf.choice() }, 500);
          return;

        }


        $(".moveButton").click(simple_inf.next);



        // move on to next phase of exposure
        simple_inf.agentOrient[0].shift();
      }
    };
