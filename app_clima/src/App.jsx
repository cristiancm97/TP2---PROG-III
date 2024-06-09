import {LoadingButton} from "@mui/lab"
import { Box, Container, TextField, Typography } from "@mui/material"
import { useState } from "react";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`

function App() {

  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState ({
    error: false,
    message: "",
  });
  const [weather, setWeather] = useState ({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });
    try {
      if(!city.trim()) throw { message : "El campo ciudad es obligatorio"};
        const response = await fetch(`${API_WEATHER}${city}`);
        const data = await response.json();

        if (data.error) throw { message: data.error.message};
        setWeather ({
          city: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          condition: data.current.condition.code,
          icon: data.current.condition.icon,
          conditionText: data.current.condition.text,
        })
    } catch (error) {
      setError({
        error: true,
      message: error.message,
      })
    } finally {
        setLoading(false)
    }
  }

  return (
    <Container 
      maxWidth="xs"
      sx={{mt: "5%",
        backgroundColor: "#6EB5C0",
        border: "4px solid #006C84",
        borderRadius: "15px"
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="#E2E8E4"
        gutterBottom
      >
        Weather App
      </Typography>
      <Box
        sx={{display: "grid", gap: 2, alignItems:"center", alignContent:"center"}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField 
          id="city"
          label="Escriba la ciudad"
          variant="filled"
          size="small"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
          sx={{backgroundColor: "white", borderRadius:"5px"}}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Cargando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: "0px",
            textAlign: "center",
            gridTemplateRows: "1fr 2fr",
            border:"1px solid #E2E8E4",
            borderRadius: "15px",
            backgroundColor:"#006C84",
            //justifyItems: "center",  // Centra horizontalmente
            alignItems: "center",    // Centra verticalmente
          }}
        >
          <Typography variant="h4" component="h2" sx={{justifyContent:"center", color:"#E2E8E4"}}>
            {weather.city}, {weather.country}
          </Typography>
          <Box
            sx={{
              mt: 0,
              display: "grid",
              gap: "0px",
              textAlign: "center",
              gridTemplateColumns: "repeat(2,1fr)",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: "0px",
                textAlign: "center",
                gridTemplateRows: "2fr 1fr",
                justifyItems: "center",
                alignItems: "center",
                paddingBottom: 2,
              }}
            >
              <Box
                component="img"
                alt={weather.conditionText}
                src={weather.icon}
                sx={{margin: "0 auto", width:"80px", height:"80px"}}
              />
              <Typography variant="h4" component="h3" sx={{color:"#E2E8E4"}}>
                {weather.conditionText}
              </Typography>  
              </Box>
              <Typography variant="h4" component="h2"sx={{color:"#E2E8E4", fontSize:"45px"}}> 
                {weather.temp} °C
              </Typography>               
            </Box>                    
          </Box>
      )}

      <Typography
        textAlign="center"
        sx={{mt: 2, mb: 2, fontSize: "17px", color:"white"}}
      >
        NOTA: esta app esta contruida utilizando la API de {" "}
        <a 
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  )
}

export default App

