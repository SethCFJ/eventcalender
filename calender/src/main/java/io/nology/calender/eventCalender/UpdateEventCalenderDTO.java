package io.nology.calender.eventCalender;

import java.time.LocalDateTime;


import jakarta.validation.constraints.Pattern;

public class UpdateEventCalenderDTO {

  @Pattern(regexp = ".*\\S.*", message = "Name cannot be empty")
  private String name;
  @Pattern(regexp = ".*\\S.*", message = "Location cannot be empty")
  private String location;
  @Pattern(regexp = ".*\\S.*", message = "Label cannot be empty")
  private String label;
  
  private LocalDateTime startDate;
  
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
    return "UpdateEventCalenderDTO [name=" + name + ", location=" + location + ", label=" + label + ", startDate="
        + startDate + ", endDate=" + endDate + "]";
  }

  
}
