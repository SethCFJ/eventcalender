package io.nology.calender.eventCalender;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.calender.exceptions.NotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/calender")
public class EventCalenderController {
  @Autowired
  private EventCalenderService eventCalenderService;
  private static final Logger logger = LogManager.getLogger();
   @PostMapping("/events")
    public ResponseEntity<EventItem> createEvent(@RequestBody CreateEventCalenderDTO dto) {
        EventItem event = eventCalenderService.createEvent(dto);
        return ResponseEntity.ok(event);
    }

    @PatchMapping("/events/{id}")
    public ResponseEntity<EventItem> updateEvent(@PathVariable Long id, @Valid @RequestBody UpdateEventCalenderDTO data) throws NotFoundException {
        Optional<EventItem> maybeEvent = this.eventCalenderService.updateEvent(id, data);
        logger.throwing(new NotFoundException(EventItem.class, id));
        EventItem updatedEvent = maybeEvent.orElseThrow(() -> new NotFoundException(EventItem.class, id));
        logger.info("Updated item with id of " + updatedEvent.getId());
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
        
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) throws NotFoundException {
        boolean isDeleted = this.eventCalenderService.deleteEvent(id);
        if(!isDeleted){
          logger.throwing(new NotFoundException(EventItem.class, id));
          throw new NotFoundException(EventItem.class, id);
        }
        logger.info("Deleting task with id of " + id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventItem>> getAllEvents() {
        List<EventItem> allEvents = this.eventCalenderService.getAllEvents();
        logger.info("Retrieved " + allEvents.size() + " task/s");
        return new ResponseEntity<>(allEvents, HttpStatus.OK);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<EventItem> getEventById(@PathVariable Long id) throws NotFoundException {
        Optional<EventItem> maybeEvent = this.eventCalenderService.getEventById(id);
        logger.throwing(new NotFoundException(EventItem.class, id));
        EventItem foundEvent = maybeEvent.orElseThrow(() -> new NotFoundException(EventItem.class, id));
        logger.info("Retrieved task with id of " + foundEvent.getId());
        return new ResponseEntity<>(foundEvent, HttpStatus.OK);
    }

    @GetMapping("/events/label/{label}")
    public ResponseEntity<List<EventItem>> getEventsByLabel(@PathVariable String label) {
        List<EventItem> events = eventCalenderService.getEventsByLabel(label);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/location/{location}")
    public ResponseEntity<List<EventItem>> getEventsByLocation(@PathVariable String location) {
        List<EventItem> events = eventCalenderService.getEventsByLocation(location);
        return ResponseEntity.ok(events);
    }
  }
