import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { Loader } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar-custom.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const EventTracker = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchAllContests();
  }, []);

  const fetchCodeforces = async () => {
    try {
      const res = await fetch("https://codeforces.com/api/contest.list");
      const data = await res.json();

      if (data.status === "OK") {
        return data.result
          .filter((c) => c.phase === "BEFORE")
          .map((c) => ({
            id: `cf-${c.id}`,
            title: c.name,
            start: new Date(c.startTimeSeconds * 1000),
            end: new Date(c.startTimeSeconds * 1000 + c.durationSeconds * 1000),
            duration: c.durationSeconds,
            link: `https://codeforces.com/contests/${c.id}`,
            platform: "cf",
          }));
      }
    } catch (err) {
      console.error("Codeforces fetch failed:", err);
    }
    return [];
  };

  // const fetchLeetCode = async () => {
  //   try {
  //     const res = await fetch("https://leetcode.com/contest/api/list/active/");
  //     const data = await res.json();

  //     if (data && data.contests) {
  //       return data.contests
  //         .filter((c) => c.start_time * 1000 > Date.now())
  //         .map((c) => ({
  //           id: `lc-${c.title_slug}`,
  //           title: c.title,
  //           start: new Date(c.start_time * 1000),
  //           end: new Date((c.start_time + c.duration) * 1000),
  //           duration: c.duration,
  //           link: `https://leetcode.com/contest/${c.title_slug}/`,
  //           platform: "lc",
  //         }));
  //     }
  //   } catch (err) {
  //     console.error("LeetCode fetch failed:", err);
  //   }
  //   return [];
  // };

  const fetchAllContests = async () => {
    setLoading(true);
    const [cf, lc] = await Promise.all([fetchCodeforces()]);
    const all = [...cf].sort((a, b) => a.start - b.start);
    setContests(all);
    setLoading(false);
  };

  const formatDate = (date) =>
    date.toLocaleString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="p-6 bg-white min-h-screen pt-24">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Contest Event Tracker</h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Contest Cards */}
          <div className="lg:col-span-1 max-h-[600px] overflow-y-auto pr-2 space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="flex gap-3 items-start bg-orange-50 border border-orange-200 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={contest.platform === "cf" ? "/codeforces.png" : "/leetcode.png"}
                  alt="Platform"
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <h2 className="text-md font-semibold text-gray-800">{contest.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Starts:</span> {formatDate(contest.start)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Duration:</span>{" "}
                    {(contest.duration / 3600).toFixed(1)} hrs
                  </p>
                  <a
                    href={contest.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-orange-600 hover:underline"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Calendar View */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 shadow bg-white overflow-hidden">
              <Calendar
                localizer={localizer}
                events={contests}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                components={{
                  event: ({ event }) => (
                    <div className="flex items-center gap-1">
                      <img
                        src={event.platform === "cf" ? "/cf.png" : "/lc.png"}
                        alt="Platform"
                        className="w-4 h-4"
                      />
                      <span className="text-xs">{event.title}</span>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTracker;
