package io.nology.calender.eventCalender;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import jakarta.validation.constraints.NotBlank;

public class CreateEventCalenderDTO {
  @NotBlank
  private String name;
  @NotBlank
  private String location;
  @NotBlank
  private String label;
  @NotBlank
  private LocalDateTime startDate;
  @NotBlank
  private LocalDateTime endDate;
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getLocation() {
    return location;
  }
  public void setLocation(String location) {
    this.location = location;
  }
  public String getLabel() {
    return label;
  }
  public void setLabel(String label) {
    this.label = label;
  }
  public LocalDateTime getStartDate() {
    return startDate;
  }
  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }
  public LocalDateTime getEndDate() {
    return endDate;
  }
  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }
  @Override
  public String toString() {
    return "CreateEventCalenderDTO [name=" + name + ", location=" + location + ", label=" + label + ", startDate="
        + startDate + ", endDate=" + endDate + "]";
  }

  
}
