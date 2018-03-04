# Tax Lookup

### An HTTP API to provide real estate tax balance data for a given account number.

This API scrapes the HTML of the City of Philadelphia's tax lookup application’s <a href="http://www.phila.gov/revenue/realestatetax/?txtBRTNo=883309050">results page</a> using the txtBRTNo query string parameter to lookup a specific account on the tax lookup application.

Build and run the image using the following instructions
```
docker build -t [NAME YOUR IMAGE] .
docker run -dit --name [NAME YOUR CONTAINER] IMAGE
```
<p>Once done you can view the app from the container's IP address.</p>
<p>Enter the Account number you would like and you should receive the tax balance info.</p> 
