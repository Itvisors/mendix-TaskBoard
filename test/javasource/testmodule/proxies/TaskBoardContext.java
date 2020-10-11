// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package testmodule.proxies;

public class TaskBoardContext
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject taskBoardContextMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "TestModule.TaskBoardContext";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		DroppedOnColumnId("DroppedOnColumnId"),
		TaskBoardContext_TaskBoard("TestModule.TaskBoardContext_TaskBoard"),
		TaskBoardContext_Account("TestModule.TaskBoardContext_Account");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public TaskBoardContext(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "TestModule.TaskBoardContext"));
	}

	protected TaskBoardContext(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject taskBoardContextMendixObject)
	{
		if (taskBoardContextMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("TestModule.TaskBoardContext", taskBoardContextMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a TestModule.TaskBoardContext");

		this.taskBoardContextMendixObject = taskBoardContextMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'TaskBoardContext.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static testmodule.proxies.TaskBoardContext initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return testmodule.proxies.TaskBoardContext.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static testmodule.proxies.TaskBoardContext initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new testmodule.proxies.TaskBoardContext(context, mendixObject);
	}

	public static testmodule.proxies.TaskBoardContext load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return testmodule.proxies.TaskBoardContext.initialize(context, mendixObject);
	}

	public static java.util.List<testmodule.proxies.TaskBoardContext> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<testmodule.proxies.TaskBoardContext> result = new java.util.ArrayList<testmodule.proxies.TaskBoardContext>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//TestModule.TaskBoardContext" + xpathConstraint))
			result.add(testmodule.proxies.TaskBoardContext.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(com.mendix.systemwideinterfaces.core.IContext context)
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of DroppedOnColumnId
	 */
	public final java.lang.Long getDroppedOnColumnId()
	{
		return getDroppedOnColumnId(getContext());
	}

	/**
	 * @param context
	 * @return value of DroppedOnColumnId
	 */
	public final java.lang.Long getDroppedOnColumnId(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Long) getMendixObject().getValue(context, MemberNames.DroppedOnColumnId.toString());
	}

	/**
	 * Set value of DroppedOnColumnId
	 * @param droppedoncolumnid
	 */
	public final void setDroppedOnColumnId(java.lang.Long droppedoncolumnid)
	{
		setDroppedOnColumnId(getContext(), droppedoncolumnid);
	}

	/**
	 * Set value of DroppedOnColumnId
	 * @param context
	 * @param droppedoncolumnid
	 */
	public final void setDroppedOnColumnId(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Long droppedoncolumnid)
	{
		getMendixObject().setValue(context, MemberNames.DroppedOnColumnId.toString(), droppedoncolumnid);
	}

	/**
	 * @return value of TaskBoardContext_TaskBoard
	 */
	public final testmodule.proxies.TaskBoard getTaskBoardContext_TaskBoard() throws com.mendix.core.CoreException
	{
		return getTaskBoardContext_TaskBoard(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskBoardContext_TaskBoard
	 */
	public final testmodule.proxies.TaskBoard getTaskBoardContext_TaskBoard(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		testmodule.proxies.TaskBoard result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.TaskBoardContext_TaskBoard.toString());
		if (identifier != null)
			result = testmodule.proxies.TaskBoard.load(context, identifier);
		return result;
	}

	/**
	 * Set value of TaskBoardContext_TaskBoard
	 * @param taskboardcontext_taskboard
	 */
	public final void setTaskBoardContext_TaskBoard(testmodule.proxies.TaskBoard taskboardcontext_taskboard)
	{
		setTaskBoardContext_TaskBoard(getContext(), taskboardcontext_taskboard);
	}

	/**
	 * Set value of TaskBoardContext_TaskBoard
	 * @param context
	 * @param taskboardcontext_taskboard
	 */
	public final void setTaskBoardContext_TaskBoard(com.mendix.systemwideinterfaces.core.IContext context, testmodule.proxies.TaskBoard taskboardcontext_taskboard)
	{
		if (taskboardcontext_taskboard == null)
			getMendixObject().setValue(context, MemberNames.TaskBoardContext_TaskBoard.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.TaskBoardContext_TaskBoard.toString(), taskboardcontext_taskboard.getMendixObject().getId());
	}

	/**
	 * @return value of TaskBoardContext_Account
	 */
	public final administration.proxies.Account getTaskBoardContext_Account() throws com.mendix.core.CoreException
	{
		return getTaskBoardContext_Account(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskBoardContext_Account
	 */
	public final administration.proxies.Account getTaskBoardContext_Account(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		administration.proxies.Account result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.TaskBoardContext_Account.toString());
		if (identifier != null)
			result = administration.proxies.Account.load(context, identifier);
		return result;
	}

	/**
	 * Set value of TaskBoardContext_Account
	 * @param taskboardcontext_account
	 */
	public final void setTaskBoardContext_Account(administration.proxies.Account taskboardcontext_account)
	{
		setTaskBoardContext_Account(getContext(), taskboardcontext_account);
	}

	/**
	 * Set value of TaskBoardContext_Account
	 * @param context
	 * @param taskboardcontext_account
	 */
	public final void setTaskBoardContext_Account(com.mendix.systemwideinterfaces.core.IContext context, administration.proxies.Account taskboardcontext_account)
	{
		if (taskboardcontext_account == null)
			getMendixObject().setValue(context, MemberNames.TaskBoardContext_Account.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.TaskBoardContext_Account.toString(), taskboardcontext_account.getMendixObject().getId());
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return taskBoardContextMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final testmodule.proxies.TaskBoardContext that = (testmodule.proxies.TaskBoardContext) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "TestModule.TaskBoardContext";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
