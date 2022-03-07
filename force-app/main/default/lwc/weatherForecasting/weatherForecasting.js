import { LightningElement, track } from 'lwc';
import weatherCallout from '@salesforce/apex/WeatherAPIService.weatherCallout';

export default class WeatherDataLWC extends LightningElement {
    @track result;
    cityValue = '';
    postalValue ='';
    cityName;
    temperature;
    weatherchk =false;

    handleChange(event) {
       if (event.target.label === 'City Name'){
        this.cityValue = event.target.value;
       }
       if (event.target.label === 'Postal code'){
        this.postalValue = event.target.value;
       }
    }
    /* Method to check weather  */
    UpdateWeather(event){
        weatherCallout({ location: this.cityValue ,postalCode:this.postalValue })
        .then(data => {

            //To assign the longitude and latitude to map
            this.mapMarkers = [{
                location: {
                    Latitude: data['latitude'],
                    Longitude: data['longitude']
                },
                title: data['cityName'] + ', ' + data['state'],
            }];
            this.result = data;
            if (this.result) {
                this.weatherchk =true
                this.cityName = this.result.cityName + ' Information';
                this.temperature = this.result.cityTemp;
             }
        }).catch(err => console.log(err));
    }
}