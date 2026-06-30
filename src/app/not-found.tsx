export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-8xl font-bold tracking-tight text-apple-blue">
        404
      </p>
      <h1 className="mb-4 text-2xl font-semibold text-apple-text md:text-3xl">
        页面未找到
      </h1>
      <p className="mb-10 max-w-md text-base leading-relaxed text-apple-muted">
        你寻找的页面不存在。也许它已经被移走、重命名，或者从未存在过。
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-apple-blue-hover"
      >
        返回首页
      </a>
    </div>
  );
}
