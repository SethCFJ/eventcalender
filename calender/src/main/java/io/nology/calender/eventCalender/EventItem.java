package io.nology.calender.eventCalender;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "EventCalender")
public class EventItem {
  @Id
  @GeneratedValue(strategy =  GenerationType.IDENTITY)
  private Long id;
  @Column
  private String name;
  @Column
  private String label;
  @Column 
  private String location;
  @Column
  private LocalDateTime startDate;
  @Column
  private LocalDateTime endDate;

  EventItem() {}

  
  public void setName(String name) {
    this.name = name;
  }
  public void setLabel(String label) {
    this.label = label;
  }
  public void setLocation(String location) {
    this.location = location;
  }
  public void setStartDate(LocalDateTime localDateTime) {
    this.startDate = localDateTime;
  }
  public void setEndDate(LocalDateTime localDateTime) {
    this.endDate = localDateTime;
  }
  public Long getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public String getLabel() {
    return label;
  }
  public String getLocation() {
    return location;
  }
  public LocalDateTime getStartDate() {
    return startDate;
  }
  public LocalDateTime getEndDate() {
    return endDate;
  }
  @Override
  public String toString() {
    return "EventItem [id=" + id + ", name=" + name + ", label=" + label + ", location=" + location + ", startDate="
        + startDate + ", endDate=" + endDate + "]";
  }

  
  
}
