package io.nology.calender.eventCalender;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.swing.plaf.OptionPaneUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventCalenderService {
  @Autowired
  private EventCalenderRepository repo;
   public EventItem createEvent(CreateEventCalenderDTO data) {
        EventItem event = new EventItem();
        event.setName(data.getName().trim());
        event.setLocation(data.getLocation().trim());
        event.setLabel(data.getLabel());
        event.setStartDate(data.getStartDate());
        event.setEndDate(data.getEndDate());
        return this.repo.save(event);
    }

    public Optional<EventItem> updateEvent(Long id, UpdateEventCalenderDTO data) {
        Optional<EventItem> maybeEvent = this.getEventById(id);
        if(maybeEvent.isEmpty()) {
          return maybeEvent;
        }
        EventItem foundEvent = maybeEvent.get();
        String newName = data.getName();
        if(newName != null){
          foundEvent.setName(newName.trim());
        }
        String newLabel = data.getLabel();
        if(newLabel != null) {
          foundEvent.setLabel(newLabel.trim());
        }
        String newLocation = data.getLocation();
        if (newLocation != null){
          foundEvent.setLocation(newLocation.trim());
        }
        LocalDateTime newStartDate = data.getStartDate();
        if(newStartDate != null){
          foundEvent.setStartDate(newStartDate);
        }
        LocalDateTime newEndDate = data.getEndDate();
        if(newStartDate != null){
          foundEvent.setStartDate(newEndDate);
        }
        EventItem updatedEvent = this.repo.save(foundEvent);
        return Optional.of(updatedEvent);
    }

    public boolean deleteEvent(Long id) {
      Optional<EventItem> maybeEvent = this.getEventById(id);
      if(maybeEvent.isEmpty()){
        return false;
      }
      this.repo.delete(maybeEvent.get());
      return true;
    }

    public List<EventItem> getAllEvents() {
        return this.repo.findAll();
    }

    public Optional<EventItem> getEventById(Long id) {
        return this.repo.findById(id);
    }

    public List<EventItem> getEventsByLabel(String label) {
        return repo.findByLabel(label);
    }

    public List<EventItem> getEventsByLocation(String location) {
        return repo.findByLocation(location);
    }
}
