package com.example.consultations;

import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class ConsultationsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsultationsApplication.class, args);
    }

    @GetMapping("/")
    public String getMain(){
        return "form_patient.html";
    }
}
