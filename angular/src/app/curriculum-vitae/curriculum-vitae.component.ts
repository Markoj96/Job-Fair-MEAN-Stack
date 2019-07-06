import { AuthService } from './../auth.service';
import { HttpErrorResponse } from "@angular/common/http";
import { CurriculumVitaeService } from "./../curriculum-vitae.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-curriculum-vitae",
  templateUrl: "./curriculum-vitae.component.html",
  styleUrls: ["./curriculum-vitae.component.css"]
})
export class CurriculumVitaeComponent implements OnInit {

  cvUserData = null
  cvForm: FormGroup
  systemSettings: Object = { }
  username: String
  chTime: number
  constructor(private auth: AuthService, private cvService: CurriculumVitaeService, private router: Router, private builder: FormBuilder) { }

  ngOnInit() 
  {
    this.auth.checkUser().subscribe(
      response => {
        this.auth.getUsername()
          .subscribe(
            response =>
            {
              this.username = response.Username
              this.cvService.getCV(this.username)
              .subscribe(
                response => 
                {
                  this.cvUserData = response.cv
                  this.chTime = this.cvUserData.Changed_Times
                  console.log(this.chTime)
                  this.fillFormWithCV()
                },
                error =>
                {
                  this.chTime = 0
                  this.cvUserData = null
                  console.log(this.chTime)
                }
              )
            },
            error =>
            {
              if(error instanceof HttpErrorResponse)
              {
                if(error.status === 401 || error.status === 404)
                {
                  localStorage.removeItem("token")
                  localStorage.removeItem("Type")
                  localStorage.removeItem("Administrator")
                  this.router.navigate(["/login"])
                }
              } 
            }
          )

        this.cvService.cvEnabled()
          .subscribe(
            response =>
            {
              this.systemSettings = response
            },
            error =>
            {
              if(error instanceof HttpErrorResponse)
              {
                console.log(error)
              }
            }
          )
      },
      error => {
        if(error instanceof HttpErrorResponse)
        {
          if(error.status === 401 || error.status === 404)
          {
            localStorage.removeItem("token")
            localStorage.removeItem("Type")
            this.router.navigate(["/login"])
          }
        }
      }
    )

    this.cvForm = this.builder.group({
      Username: "",
      First_Name: "",
      Last_Name: "",
      Birth_Date: "",
      Postal_Code: "",
      City: "",
      Country: "",
      Phone: "",
      Email: "",
      WEB_Site: "",
      Work_Experience: this.builder.array([]),
      Education_Training: this.builder.array([]),
      Mother_Tongues: this.builder.array([]),
      Foreign_Languages: this.builder.array([]),
      Communication_Skills: this.builder.array([]),
      Organisational_Managerial_Skills: this.builder.array([]),
      Job_Related_Skills: this.builder.array([]),
      Digital_Skills: this.builder.array([])
    })
  }

  convertDate(date)
  {
    const newDate = new Date(date)
    return newDate.toISOString().substring(0, 10)
  }

  fillFormWithCV()
  {
    const First_Name = this.cvForm.controls["First_Name"]
    First_Name.setValue(this.cvUserData.First_Name)      


    const Last_Name = this.cvForm.controls["Last_Name"]
    Last_Name.setValue(this.cvUserData.Last_Name)


    if(this.chTime > 0)
    {
      First_Name.disable()
      Last_Name.disable()
    }


    const Birth_Date = this.cvForm.controls["Birth_Date"]
    Birth_Date.setValue(this.convertDate(this.cvUserData.Birth_Date))

    const Postal_Code = this.cvForm.controls["Postal_Code"]
    Postal_Code.setValue(this.cvUserData.Postal_Code)

    const City = this.cvForm.controls["City"]
    City.setValue(this.cvUserData.City)

    const Country = this.cvForm.controls["Country"]
    Country.setValue(this.cvUserData.Country)
    
    const Phone = this.cvForm.controls["Phone"]
    Phone.setValue(this.cvUserData.Phone)

    const Email = this.cvForm.controls["Email"]
    Email.setValue(this.cvUserData.Email)
    
    const WEB_Site = this.cvForm.controls["WEB_Site"]
    WEB_Site.setValue(this.cvUserData.WEB_Site)

    const Work_Experience = <FormArray>this.cvForm.controls["Work_Experience"]
    for(let i = 0; i < this.cvUserData.Work_Experience.length; i++)
    {
      Work_Experience.push(this.initWorkExperience(this.cvUserData.Work_Experience[i]))
    }

    const Education_Training = <FormArray>this.cvForm.controls["Education_Training"]
    for(let i = 0; i < this.cvUserData.Education_Training.length; i++)
    {
      Education_Training.push(this.initEducationTraining(this.cvUserData.Education_Training[i]))
    }

    const Mother_Tongues = <FormArray>this.cvForm.controls["Mother_Tongues"]
    for(let i = 0; i < this.cvUserData.Mother_Tongues.length; i++)
    {
      Mother_Tongues.push(this.initMotherTongue(this.cvUserData.Mother_Tongues[i]))
    }

    const Foreign_Languages = <FormArray>this.cvForm.controls["Foreign_Languages"]
    for(let i = 0; i < this.cvUserData.Foreign_Languages.length; i++)
    {
      Foreign_Languages.push(this.initForeignLanguage(this.cvUserData.Foreign_Languages[i]))
    }

    const Communication_Skills = <FormArray>this.cvForm.controls["Communication_Skills"]
    for(let i = 0; i < this.cvUserData.Communication_Skills.length; i++)
    {
      Communication_Skills.push(this.initCommunicationSkill(this.cvUserData.Communication_Skills[i]))
    }

    const Organisational_Managerial_Skills = <FormArray>this.cvForm.controls["Organisational_Managerial_Skills"]
    for(let i = 0; i < this.cvUserData.Organisational_Managerial_Skills.length; i++)
    {
      Organisational_Managerial_Skills.push(this.initOrganisationalManagerialSkill(this.cvUserData.Organisational_Managerial_Skills[i]))
    }

    const Job_Related_Skills = <FormArray>this.cvForm.controls["Job_Related_Skills"]
    for(let i = 0; i < this.cvUserData.Job_Related_Skills.length; i++)
    {
      Job_Related_Skills.push(this.initJobRelatedSkill(this.cvUserData.Job_Related_Skills[i]))
    } 
  }

  initWorkExperience(Work_Experience?: any)
  {
    if(!Work_Experience)
    {
      return this.builder.group({
        "dateFrom": "",
        "dateTo": "",
        "Employer": "",
        "City": "",
        "Country": "",
        "Description":""
      })
    }
    else
    {
      return this.builder.group({
        "dateFrom": Work_Experience.dateFrom,
        "dateTo": Work_Experience.dateTo,
        "Employer": Work_Experience.Employer,
        "City": Work_Experience.City,
        "Country": Work_Experience.Country,
        "Description": Work_Experience.Description
      })
    }
  }

  addWorkExperience()
  {
    const control = <FormArray>this.cvForm.controls["Work_Experience"];
    control.push(this.initWorkExperience())
  }

  removeWorkExperience(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Work_Experience"];
    control.removeAt(i);
  }

  initEducationTraining(Education_Training?: any)
  {
    if(!Education_Training)
    {
      return this.builder.group({
        "dateFrom": "",
        "dateTo": "",
        "Title": "",
        "Organization": "",
        "City": "",
        "Country": "",
        "EQF_Level": "",
        "Description":""
      })
    }
    else
    {
      return this.builder.group({
        "dateFrom": Education_Training.dateFrom,
        "dateTo": Education_Training.dateTo,
        "Title": Education_Training.Title,
        "Organization": Education_Training.Organization,
        "City": Education_Training.City,
        "Country": Education_Training.Country,
        "EQF_Level": Education_Training.EQF_Level,
        "Description": Education_Training.Description
      })
    }
  }

  addEducationTraining()
  {
    const control = <FormArray>this.cvForm.controls["Education_Training"];
    control.push(this.initEducationTraining())
  }

  removeEducationTraining(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Education_Training"];
    control.removeAt(i);
  }

  initMotherTongue(Mother_Tongue?: any)
  {
    if(!Mother_Tongue)
    {
      return this.builder.group({
        "Language": "",
      })
    }
    else
    {
      return this.builder.group({
        "Language": Mother_Tongue.Language
      })
    }
  }

  addMotherTongue()
  {
    const control = <FormArray>this.cvForm.controls["Mother_Tongues"];
    control.push(this.initMotherTongue())
  }

  removeMotherTongue(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Mother_Tongues"];
    control.removeAt(i);
  }

  initForeignLanguage(Foreign_Language?: any)
  {
    if(!Foreign_Language)
    {
      return this.builder.group({
        "Language": "",
        "Understanding_Listening": "",
        "Understanding_Reading": "",
        "Speaking_Interaction": "",
        "Speaking_Production": "",
        "Writing": "",
        "Diploma_Certificate": ""
      })
    }
    else
    {
      return this.builder.group({
        "Language": Foreign_Language.Language,
        "Understanding_Listening": Foreign_Language.Understanding_Listening,
        "Understanding_Reading": Foreign_Language.Understanding_Reading,
        "Speaking_Interaction": Foreign_Language.Speaking_Interaction,
        "Speaking_Production": Foreign_Language.Speaking_Production,
        "Writing": Foreign_Language.Writing,
        "Diploma_Certificate": Foreign_Language.Diploma_Certificate
      })
    }
  }

  addForeignLanguage()
  {
    const control = <FormArray>this.cvForm.controls["Foreign_Languages"];
    control.push(this.initForeignLanguage())
  }

  removeForeignLanguage(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Foreign_Languages"];
    control.removeAt(i);
  }

  initCommunicationSkill(Communication_Skill?: any)
  {
    if(!Communication_Skill)
    {
      return this.builder.group({
        "Description": ""
      })
    }
    else
    {
      return this.builder.group({
        "Description": Communication_Skill.Description
      })
    }
  }

  addCommunicationSkill()
  {
    const control = <FormArray>this.cvForm.controls["Communication_Skills"];
    control.push(this.initCommunicationSkill())
  }

  removeCommunicationSkill(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Communication_Skills"];
    control.removeAt(i);
  }

  initOrganisationalManagerialSkill(Organisational_Managerial_Skill?: any)
  {
    if(!Organisational_Managerial_Skill)
    {
      return this.builder.group({
        "Description": ""
      })
    }
    else
    {
      return this.builder.group({
        "Description": Organisational_Managerial_Skill.Description
      })
    }
  }

  addOrganisationalManagerialSkill()
  {
    const control = <FormArray>this.cvForm.controls["Organisational_Managerial_Skills"];
    control.push(this.initOrganisationalManagerialSkill())
  }

  removeOrganisationalManagerialSkill(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Organisational_Managerial_Skills"];
    control.removeAt(i);
  }

  initJobRelatedSkill(Job_Related_Skill?: any)
  {
    if(!Job_Related_Skill)
    {
      return this.builder.group({
        "Description": ""
      })
    }
    else
    {
      return this.builder.group({
        "Description": Job_Related_Skill.Description
      })
    }
  }

  addJobRelatedSkill()
  {
    const control = <FormArray>this.cvForm.controls["Job_Related_Skills"];
    control.push(this.initJobRelatedSkill())
  }

  removeJobRelatedSkill(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Job_Related_Skills"];
    control.removeAt(i);
  }

  initDigitalSkill(Digital_Skill?: any)
  {
    if(!Digital_Skill)
    {
      return this.builder.group({
        "Information_Processing": "",
        "Communication": "",
        "Content_Reaction": "",
        "Safety": "",
        "Problem_Solving": "",
        "Other_Computer_Skills":""
      })
    }
    else
    {
      return this.builder.group({
        "Information_Processing": Digital_Skill.Information_Processing,
        "Communication": Digital_Skill.Communication,
        "Content_Reaction": Digital_Skill.Content_Reaction,
        "Safety": Digital_Skill.Safety,
        "Problem_Solving": Digital_Skill.Problem_Solving,
        "Other_Computer_Skills": Digital_Skill.Other_Computer_Skills
      })
    }
  }

  addDigitalSkill()
  {
    const control = <FormArray>this.cvForm.controls["Digital_Skills"];
    control.push(this.initDigitalSkill())
  }

  removeDigitalSkill(i: number)
  {
    const control = <FormArray>this.cvForm.controls["Digital_Skills"];
    control.removeAt(i);
  }

  saveCV()
  {
    if(!this.cvUserData)
      this.chTime = 0
    else
    {
      console.log("PROSAO ELSE")
      console.log(this.cvUserData.Changed_Times)
      this.chTime = this.cvUserData.Changed_Times + 1
    }
      
    this.cvUserData = this.cvForm.value
    this.cvUserData.Changed_Times = this.chTime
    this.cvUserData.Username = this.username
    this.cvService.saveCV(this.cvUserData)
      .subscribe(
        response => {
          window.location.reload()
        },
        error => {
          window.location.reload()
        }
    )
  }
}