   global class WeatherAPIService {
    
    @AuraEnabled (cacheable=true)
  global static WeatherData weatherCallout(String location) {
      HttpRequest req = new HttpRequest();
      if (location != ''){
          req.setEndpoint('https://api.weatherbit.io/v2.0/current?city=' + location + '&key=0e5d245a2757475cb1e8ac3f6b218109');  
      }    
      req.setMethod('GET');
      Http http = new Http();
      HTTPResponse res = http.send(req);
      JSONParser parser = JSON.createParser(res.getBody());     
      
      WeatherData weather = new WeatherData();
       while (parser.nextToken() != null) {
          if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
              parser.nextValue();
              system.debug('---->'+parser.getCurrentName() );
              switch on parser.getCurrentName() {
                  when 'temp' {
                      weather.cityTemp = Decimal.valueOf(parser.getText());
                  }
                  when 'city_name' {
                      weather.cityName = parser.getText();
                  }
                 // when 'state_code' {
                     // weather.state = parser.getText();
                //  } 
              }
          }
      }
      return weather;
  }
  global class WeatherData {
      @AuraEnabled public String cityName;
      @AuraEnabled public Decimal cityTemp;
      @AuraEnabled public String state;
   }
  

}