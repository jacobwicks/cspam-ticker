import { LogEvent } from "../types";

const listenToEvents = () => {
  try {
    console.log("trying to listen to events");
    const route = "logEvent";
    // const eventUrl = `${apiUrl}${route}`;
    const eventUrl = `https://cspam-ticker.herokuapp.com/${route}`;
    const events = new EventSource(eventUrl);

    events.onmessage = (event) => {
      const parsedEvent: LogEvent | LogEvent[] = JSON.parse(event.data);
      //parsed event is either LogEvent or LogEvent[]
      console.log(`got an event`, parsedEvent);
      //received an array of events
      if (Array.isArray(parsedEvent)) {
        console.log("its an array");
      } else {
        const messageTicker = document.getElementById("messageTicker");
        const post = parsedEvent.data;
        if (post) {
          if (messageTicker) {
            const postBody = document.createElement("a");
            postBody.href = post.link;
            postBody.target = "_blank";
            postBody.classList.add("text");
            postBody.innerText =
              post.body.length < 300
                ? post.body
                : `${post.body.slice(0, 297)}...`;

            const child = messageTicker.childNodes[0];

            child
              ? messageTicker.replaceChild(postBody, child)
              : messageTicker.appendChild(postBody);
          }

          const infoTicker = document.getElementById("infoTicker");

          if (infoTicker) {
            const infoContainer = document.createElement("span");
            infoContainer.classList.add("text");

            if (post.author) {
              const authorLink = document.createElement("a");
              authorLink.href = post.author.profile;
              authorLink.innerText = post.author.name;
              authorLink.target = "_blank";
              infoContainer.appendChild(authorLink);
            }

            if (post.thread) {
              const threadLink = document.createElement("a");
              threadLink.href = `https://forums.somethingawful.com/showthread.php?threadid=${post.thread.threadId}`;
              threadLink.innerText = post.thread.title;
              threadLink.target = "_blank";
              infoContainer.appendChild(threadLink);
            }

            const spacing = document.createElement("span");
            spacing.innerText = ":   ";

            infoContainer.appendChild(spacing);

            const child = infoTicker.childNodes[0];

            child
              ? infoTicker.replaceChild(infoContainer, child)
              : infoTicker.appendChild(infoContainer);
          }
        }
      }
    };
  } catch (err) {
    // eventsDispatch({ type: EventsActionTypes.failed });
    return;
  }
};

listenToEvents();

export default listenToEvents;
