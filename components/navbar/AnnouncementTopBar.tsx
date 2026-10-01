import Link from 'next/link'

export type Announcement = {
  text: string
  href?: string
}

type AnnouncementTopBarProps = {
  announcements: Announcement[]
}

export default function AnnouncementTopBar({ announcements }: AnnouncementTopBarProps) {
  if (announcements.length === 0) return null

  const renderAnnouncements = (isDuplicate = false) => (
    <div
      className="flex min-w-[100vw] shrink-0 items-center justify-around"
      aria-hidden={isDuplicate || undefined}
    >
      {announcements.map((announcement, index) => (
        <span key={`${announcement.text}-${index}`} className="flex shrink-0 items-center">
          {announcement.href && !isDuplicate ? (
            <Link href={announcement.href} className="px-6 hover:underline">
              {announcement.text}
            </Link>
          ) : (
            <span className="px-6">{announcement.text}</span>
          )}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="announcement-top-bar w-full overflow-hidden bg-[#222222] py-2 text-sm text-white"
      role="region"
      aria-label="Store announcements"
    >
      <div className="announcement-top-bar__track flex w-max">
        {renderAnnouncements()}
        {renderAnnouncements(true)}
      </div>
    </div>
  )
}
