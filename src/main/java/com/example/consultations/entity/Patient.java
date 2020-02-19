package com.example.consultations.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String lastName;

    private String name;

    private String middleName;

    private Date dateOfBirth;

    private String gender;

    private String socialSecurityNumber;

    public Patient() {
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

    public Long getId() {
        return id;
    }

    public boolean validPatient() {
        String regex = "^[А-Я][а-я]+$";

        Pattern pattern = Pattern.compile(regex);

        Matcher matcherName = pattern.matcher(getName());
        Matcher matcherLastName = pattern.matcher(getLastName());
        Matcher matcherMiddleName = pattern.matcher(getMiddleName());

        return matcherName.find() && matcherLastName.find() &&
                (matcherMiddleName.find() || getMiddleName() == null || getMiddleName().equals("")) &&
                isValidSsn() && dateValid() && (getGender().equals("Мужской") || getGender().equals("Женский"));
    }

    private boolean isValidSsn() {
        char[] ssn = getSocialSecurityNumber().toCharArray();

        String regex = "^[0-9]{11}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(getSocialSecurityNumber());
        if (matcher.find()) {
            int checkSum = Integer.parseInt(ssn[9] + "" + ssn[10]);
            int sum = 0;
            int y = 0;
            for (int i = 9; i > 0; i--) {
                sum += Integer.parseInt(String.valueOf(ssn[y])) * i;
                y++;
            }
            if (sum < 100 && sum == checkSum) {
                return true;
            } else if ((sum == 100 || sum == 101) && checkSum == 0) {
                return true;
            } else return sum > 101 && (sum % 101 == checkSum || (sum % 101 == 100 && checkSum == 0));
        } else {
            return false;
        }
    }

    private boolean dateValid() {
        if (this.dateOfBirth!=null){
            Date todayDate = new Date(Calendar.getInstance().getTime().getTime());
            return this.dateOfBirth.before(todayDate);
        }else {
            return false;
        }

    }
}
