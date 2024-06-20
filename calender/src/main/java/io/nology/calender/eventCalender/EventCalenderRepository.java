package io.nology.calender.eventCalender;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventCalenderRepository extends JpaRepository<EventItem, Long>{
  List<EventItem> findByLabel(String label);
  List<EventItem> findByLocation(String location);
}
