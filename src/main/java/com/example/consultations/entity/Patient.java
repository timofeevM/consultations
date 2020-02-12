package com.example.consultations.entity;

import java.util.Date;

public class Patient {
    private String lastName;

    private String name;

    private String middleName;

    private Date dateOfBirth;

    private String gender;

    private String socialSecurityNumber;

    public Patient(String lastName, String name, Date dateOfBirth, String gender, String socialSecurityNumber) {
        this.lastName = lastName;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(String socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }
}
