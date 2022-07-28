import { Component, OnInit } from '@angular/core';
import { ColorsService } from 'src/app/shared/services/colors.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {


  public features1 = {
    features1 : {
      headerText: "Totally Secure",
      descriptionText: "Get up and running with a secure solution in just a few hours.",
      featureIcon1: "fa fa-cloud",
      featureHeading1: "Everything is in the Cloud",
      featureDescription1: "No hardware or software to maintain. All updates are automatic, your data is in good hands and backed by the Google Cloud Platform.",
      featureIcon2: "fa fa-lock",
      featureHeading2: "Passwordless Security",
      featureDescription2: "That's right no password needed. Passwordless authentication is actually one of the most secure forms or authentication. You can read more about <a href='https://www.cyberark.com/what-is/passwordless-authentication/'>passwordless authentication here</a>.",
      featureIcon3: "fa fa-apple",
      featureHeading3: "Apple Authentication",
      featureDescription3: "Use your Apple ID to sign in. If mobile and iOS, use your face or fingerprint. Facebook and Google authentication also available.",
    }
  }

  public features3 = {
    features3 : {
      headerText: "e-Commerce Platform",
      descriptionText: "Taliferro provides a simple to use platform that allows practitioners to provide test to their patients. It's also flexible enough to sell anything from kits to light bulbs.",
      featureIcon1: "fa fa-adjust",
      featureHeading1: "Easy to use",
      featureDescription1: "Did we mention the platform is easy to use? After initial setup, takes about 30 minutes to start selling. ",
      featureIcon2: "fa fa-credit-card",
      featureHeading2: "Flexible Configuration",
      featureDescription2: "You can determine the about complexity or simplicity you want. Choose either simple selling or price dependent selling. Set the look and feel specific to your business.",
      featureIcon3: "fa fa-flask",
      featureHeading3: "Kit Activation",
      featureDescription3: "Once a customer receives a test you can choose whether the patient needs to activate the kit. Activating a kit involves providing details about the sample gathering allowing for a smooth laboratory process.",
      featureIcon4: "fa fa-commenting-o",
      featureHeading4: "Email and or Text Notification",
      featureDescription4: "Since communication is a key driver, email and text notification is integral to communicating status to your patient or customer. Having an automated status process allows for a better experience.",
      featureIcon5: "fa fa-search",
      featureHeading5: "Find",
      featureDescription5: "Find information fast. Our search is robust and quick. Never say again you can't find a piece of information.",
      featureIcon6: "fa fa-line-chart",
      featureHeading6: "Fast Setup",
      featureDescription6: "We strive to make the platform as easy to use as possible. We are told that the platform is simple to easy to setup and interact with. The great thing is it will get even better.",
      imageURL: [
        {url : "https://www.taliferro.com"}
      ]
    }
  }

  constructor(public colorService: ColorsService) { }

  ngOnInit(): void {
  }

}
