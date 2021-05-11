const { Builder, By ,until} = require("selenium-webdriver");
const faker = require('faker');
const moment = require('moment');
const driver = new Builder()
  .forBrowser("chrome")
  .build();

const url = "http://172.25.16.180:3000/"

async function createPatientsAllFields() {

  try {


    await driver.get(url)
    
      let fName = faker.name.firstName()
      let lName = faker.name.lastName()
      let mName = faker.name.firstName()
      let address = faker.address.streetAddress()
      let dob = faker.date.between('1980-01-01', '2021-03-30')
      dob = moment(dob).format('YYYY-MM-DD')
      let phoneNum =faker.phone.phoneNumber('0244######')
      let fullName = fName + " " + mName + " " + lName
     
      await driver.findElement(By.css("input[data-test-id = 'first-name']")).sendKeys(fName)
      await driver.findElement(By.css("input[data-test-id = 'last-name']")).sendKeys(lName)
      await driver.findElement(By.css("input[data-test-id = 'middle-name']")).sendKeys(mName)
      await driver.findElement(By.css("input[data-test-id = 'phone-number']")).sendKeys(phoneNum)
      await driver.findElement(By.css("textarea[data-test-id = 'address']")).sendKeys(address+"aaaaaaaaaaaa")
      await driver.findElement(By.css("input[data-test-id = 'dob']")).sendKeys(dob)
      await driver.findElement(By.css("a[data-test-id = 'submit-btn']")).click()
      
      // read name and address from top card
      let name = await (await driver.findElement(By.xpath("/html/body/div/div/div[2]/main/div/div[2]/h4"))).getText();
      let eladdress = await (await driver.findElement(By.xpath("/html/body/div/div/div[2]/main/div/div[2]/p[1]"))).getText()
      
      // verify if name and address are on top of card
      if (fullName == name &&eladdress.includes(address)) {
        console.log("Address and name entered are on top patient card")
        console.log("createPatientsAllFields: Pass")
      } else {
        console.log("createPatientsAllFields: Fail")
      }

    

  

  } catch (error) {
    console.log(console.log("createPatientsAllFields: Fail"))
  }

  await driver.close()

}

async function createPatientRequiredFieldsOnly() {

  try {


    await driver.get(url)

    let fName = faker.name.firstName() 
    let lName = faker.name.lastName()  
    let dob = faker.date.between('1980-01-01', '2021-03-30')
    dob = moment(dob).format('YYYY-MM-DD')
    let phoneNum =faker.phone.phoneNumber('0244######')
    
    //make entries and submit
    await driver.findElement(By.css("input[data-test-id = 'first-name']")).sendKeys(fName)
    await driver.findElement(By.css("input[data-test-id = 'last-name']")).sendKeys(lName) 
    await driver.findElement(By.css("input[data-test-id = 'phone-number']")).sendKeys(phoneNum)
    await driver.findElement(By.css("input[data-test-id = 'dob']")).sendKeys(dob)
    await driver.findElement(By.css("a[data-test-id = 'submit-btn']")).click()
    
      
      //read name from first card
    let name = await (await driver.findElement(By.xpath("/html/body/div/div/div[2]/main/div/div[2]/h4"))).getText();
   
     // verify if name read is same as name entered
   
    if (name == (fName  + " " + lName)) {
      console.log("createSinglePatientRequiredFieldsOnly: Pass")
    } else {
      console.log("createSinglePatientRequiredFieldsOnly: Fail")
    }




  } catch (error) {
    console.log("createSinglePatientRequiredFieldsOnly: Fail",error)
  }



}




createPatientRequiredFieldsOnly().then(() => {
  createPatientsAllFields()


}).catch((err)=> console.log(err))
